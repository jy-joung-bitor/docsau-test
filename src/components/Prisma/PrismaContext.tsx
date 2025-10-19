import { createContext, useContext, useReducer } from 'react';
import { Props } from '@theme/Tabs';

type ActionType = 'register' | 'unregister';
type PrismaSettings = Record<string, Props>;
type PrismaSettingsAction = {
    type: ActionType;
    settings: Props;
}

function prismaReducer(settings: PrismaSettings, action: PrismaSettingsAction): PrismaSettings {
    const { type,  settings: {  groupId } } = action;
    switch (type) {
        case 'register': {
            return { 
                ...settings, 
                [groupId]: action.settings 
            };
        }
        case 'unregister': {
            const { 
                [groupId]: _, 
                ...others 
            } = settings;

            return others;
        }
        default: {
            throw Error('Unknown action: ' + type);
        }
    }
}

const PrismaContext = createContext<PrismaSettings>({});
const PrismaDispatcherContext = createContext<React.ActionDispatch<[PrismaSettingsAction]>>(null);
export function usePrisma() {
    return useContext(PrismaContext);
}
export function usePrismaDispatch() {
    return useContext(PrismaDispatcherContext);
}

export default function PrismaProvider({ children }: { children: React.ReactNode }) {
    const [state, dispatch] = useReducer(prismaReducer, {});
    return (
        <PrismaContext value={state}>
            <PrismaDispatcherContext value={dispatch}>
                {children}
            </PrismaDispatcherContext>
        </PrismaContext>
    );
}