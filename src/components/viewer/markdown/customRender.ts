import { PluginSimple } from "markdown-it";
import Token from "markdown-it/lib/token";

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
        console.log(params);
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

    // md.core.process = (state) =>
    // {  
    //     let i, l, rules;
    //     rules = md.core.ruler.getRules('');

    //     console.log(state);
    //     console.log(rules);

    //     for (i = 0, l = rules.length; i < l; i++) {
    //       rules[i](state);

    //     }

    // }
    
    md.core.ruler.before("block", "test", (state) =>
    {
        console.log({...state});

        return false;
    });

    // md.inline.ruler2.push("test", (state) =>
    // {


    //     return false; 
    // });

    // md.core.ruler.after("linkify", "test", );
};
