import Tabs, { Props } from "@theme/Tabs";
import { usePrisma, usePrismaDispatch } from "./PrismaContext";
import { useEffect } from "react";

export default function PrismaTabs({ groupId, ...props }: Props & { groupId: string }) {
    // const settings = usePrisma();
    const dispatch = usePrismaDispatch();
    const tabs = <Tabs {...props} groupId={groupId} queryString />;

    useEffect(() => {
        dispatch({ type: 'register', settings: tabs.props });
        return () => { dispatch({ type: 'unregister', settings: props }); };
    }, []);

    return tabs;
}
