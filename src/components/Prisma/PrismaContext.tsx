import { ActionDispatch, createContext, ReactNode, useContext, useReducer } from 'react';
import { Props } from '@theme/Tabs';

type PrismaSettings = Record<string, Props>;
type PrismaAction = string | PrismaSettings;

function prismaReducer(settings: PrismaSettings, action: PrismaAction) {
    if (typeof(action) === "string") {
        const {[action]: _, ...others} = settings;
        return others;
    }
    return {
        ...settings,
        ...action,
    }
}

const PrismaContext = createContext<PrismaSettings>(null);
const PrismaDispatcherContext = createContext<ActionDispatch<[PrismaAction]>>(null);
export function usePrisma() {
    return useContext(PrismaContext);
}
export function usePrismaDispatch() {
    return useContext(PrismaDispatcherContext);
}

export default function PrismaProvider({ children }: { children: ReactNode }) {
    const [state, dispatch] = useReducer(prismaReducer, {});
    return (
        <PrismaContext value={state}>
            <PrismaDispatcherContext value={dispatch}>
                {children}
            </PrismaDispatcherContext>
        </PrismaContext>
    );
}