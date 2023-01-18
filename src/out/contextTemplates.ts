import { createContext, useCallback, useState } from "react";
import { CreateContextEnviroment, CreateDefaultContextEnviroment, IContextEnviroment } from ".";
import { FileNode } from "../types";

export const templatesNodeContext = createContext<IContextEnviroment<FileNode>>(CreateDefaultContextEnviroment<FileNode>());
export const useContextTemplateNode = () : IContextEnviroment<FileNode> => CreateContextEnviroment<FileNode>();

export const tabContext = createContext<IContextEnviroment<string>>(CreateDefaultContextEnviroment<string>());
export const useContextTabState = (defaultValue : string) : IContextEnviroment<string> => CreateContextEnviroment<string>(defaultValue);

export const selectedNodeContext = createContext<IContextEnviroment<FileNode>>(CreateDefaultContextEnviroment<FileNode>());
export const useContextTemplateSelectedNode = () : IContextEnviroment<FileNode> => CreateContextEnviroment<FileNode>();

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

