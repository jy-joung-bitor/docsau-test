import Tabs, { Props } from "@theme/Tabs";
import { usePrismaDispatch } from "./PrismaContext";
import { useEffect } from "react";

interface RequiredType {
    groupId: string;
}

export default function PrismaTabs(props: Omit<Props, 'queryString'> & RequiredType) {
    const dispatch = usePrismaDispatch();
    const settings = { ...props, queryString: true};
    useEffect(() => {
        dispatch({ type: 'register', settings });
        return () => { dispatch({ type: 'unregister', settings }); };
    }, []);

    return <Tabs {...settings} />;
}
