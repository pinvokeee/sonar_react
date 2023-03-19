import { PluginSimple } from "markdown-it";
import Token from "markdown-it/lib/token";
import { encode } from "punycode";
import { converter } from "../../../util/converter";
import { generateUuid } from "../../../util/util";

export const cs1 = {
    validate: (params : string) => params.trimEnd().match(/^note\s+(.*)$/),
            
    render: function (tokens: Token[], index: number) 
    {
        if (tokens[index].info.length == 0) return '</div>';

        var m = tokens[index].info.match(/^note\s+(?<CLASS>.+?)$/);          
        if (m?.groups == null) return ``;
        if (tokens[index].nesting === 1) return `<div class="note ${m?.groups["CLASS"]}">`
        else return '</div>';
    }
}

export const code = {

    validate: (params : string) =>
    {
        return params.trim().match(/^テンプレ($|\s+(.*)$)/);
    },
            
    render: function (tokens: Token[], index: number) 
    {   
        const m = tokens[index].info.trim().match(/^テンプレ\s+(.*)$/);

        const tags = [
            "<div class='box'>",
        ];

        if (m != undefined && m[1] != "")
        {
            tags.push(`<div class="clip_title">${m[1]}</div>`);
        }

        tags.push("<pre class='p12'>")

        if (tokens[index].nesting == 0) return '</pre></div>';
        if (tokens[index].nesting == 1) return tags.join("");

        // if (tokens[index].nesting == 1) return `<div><input type="button" value="コピー" onClick="alert('adwadaw');" />`;

        return `</pre></div>`;
    }
}

export const markdownItPlugin: PluginSimple = (md) => {

    const header: string[] = [];

    md.core.process = (state) =>
    {  
        header.length = 0;

        let i, l, rules;
        rules = md.core.ruler.getRules('');

        for (i = 0, l = rules.length; i < l; i++) {
          rules[i](state);
        }
    }

    md.renderer.rules.heading_open = function (tokens, idx, options, env, self) { 

        const token = tokens[idx];

        if (token.nesting == 1) {

            const hash = tokens[idx + 1].content;
            header.push(hash);
            const count = header.filter(v => v == hash).length;

            token.attrSet("id", `${hash}${count > 1 ? "-" + (count - 1) : ""}`);
        }

        return self.renderToken(tokens, idx, options);
    }

    md.renderer.rules.html_block = function (tokens, idx, options, env, self) { 

        const a = converter.toDocument(tokens[idx].content);
        const iframe = a.querySelector("iframe");

        if (iframe?.getAttribute("src")?.startsWith("/")) {
            iframe.setAttribute("src", `/repository/${env["path"]}/${iframe.getAttribute("src")}`)
        }

        tokens[idx].content = a.body.innerHTML;

        return tokens[idx].content;
    }

    md.renderer.rules.image = function (tokens, idx, options, env, self) {

        const src = tokens[idx].attrGet("src");

        if ((src?.startsWith("/")) && env["path"] != undefined) {
            tokens[idx].attrSet("src", `/repository/${env["path"]}/${src}`);   
        }

        if ((src?.startsWith("./")) && env["path"] != undefined) {
            const p = src.slice(2, src.length);
            tokens[idx].attrSet("src", `./repository/${env["path"]}/${p}`);   
        }

        if ((src?.startsWith("../")) && env["path"] != undefined) {
            const p = src.slice(3, src.length);
            tokens[idx].attrSet("src", `../repository/${env["path"]}/${p}`);   
        }

        return self.renderToken(tokens, idx, options);
    }
    
    md.renderer.rules.link_open = function (tokens, idx, options, env, self) {

        const href = tokens[idx].attrGet("href");

        if (href?.startsWith("#")) {
            const id = decodeURI(href);
            tokens[idx].attrSet("href", "javascript:void(0)");
            tokens[idx].attrSet(`onClick`, `document.querySelector("${id}").scrollIntoViewIfNeeded(true);`);
        }

        if (href?.startsWith("/") && env["path"] != undefined) {
            tokens[idx].attrSet("href", `/repository/${env["path"]}/${href}`);   
        }

        if ((href?.startsWith("./")) && env["path"] != undefined) {
            const p = href.slice(2, href.length);
            tokens[idx].attrSet("href", `./repository/${env["path"]}/${p}`);   
        }

        if ((href?.startsWith("../")) && env["path"] != undefined) {
            const p = href.slice(3, href.length);
            tokens[idx].attrSet("href", `../repository/${env["path"]}/${p}`);   
        }
        return self.renderToken(tokens, idx, options);
    };

};
