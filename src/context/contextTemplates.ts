import { createContext, useCallback, useState } from "react";
import { CreateContextEnviroment, CreateDefaultContextEnviroment, IContextEnviroment } from ".";
import { ITemplateNode } from "../types";

export const templatesNodeContext = createContext<IContextEnviroment<ITemplateNode>>(CreateDefaultContextEnviroment<ITemplateNode>());
export const useContextTemplateNode = () : IContextEnviroment<ITemplateNode> => CreateContextEnviroment<ITemplateNode>();

export const tabContext = createContext<IContextEnviroment<string>>(CreateDefaultContextEnviroment<string>());
export const useContextTabState = (defaultValue : string) : IContextEnviroment<string> => CreateContextEnviroment<string>(defaultValue);

export const selectedNodeContext = createContext<IContextEnviroment<ITemplateNode>>(CreateDefaultContextEnviroment<ITemplateNode>());
export const useContextTemplateSelectedNode = () : IContextEnviroment<ITemplateNode> => CreateContextEnviroment<ITemplateNode>();

export interface typeAAA
{
    a : string,

    b : {
        a: string,
    }
};

export const testContext = createContext<IContextEnviroment<typeAAA>>(CreateDefaultContextEnviroment<typeAAA>());

export const useTestContext = () : IContextEnviroment<typeAAA> => CreateContextEnviroment<typeAAA>(    {
    a: "test",

    b: 
    {
        a: "c",
    }
});

