import { createContext, useCallback, useState } from "react";
import { CreateContextEnviroment, CreateDefaultContextEnviroment, IContextEnviroment } from ".";

export const templatesNodeContext = createContext<IContextEnviroment<any>>(CreateDefaultContextEnviroment<any>());
export const useContextTemplateNode = () : IContextEnviroment<any> => CreateContextEnviroment<any>();

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

