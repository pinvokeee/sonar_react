import { createContext, useCallback, useState } from "react";
import { CreateContextEnviroment, CreateDefaultContextEnviroment, IContextEnviroment } from ".";
import { ITemplateDirectoryNode } from "../types";

export const templatesNodeContext = createContext<IContextEnviroment<ITemplateDirectoryNode>>(CreateDefaultContextEnviroment<ITemplateDirectoryNode>());
export const useContextTemplateNode = () : IContextEnviroment<ITemplateDirectoryNode> => CreateContextEnviroment<ITemplateDirectoryNode>();

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

