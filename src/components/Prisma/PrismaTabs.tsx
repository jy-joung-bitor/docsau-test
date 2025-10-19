import Tabs, { Props } from "@theme/Tabs";
import { usePrismaDispatch } from "./PrismaContext";
import { useEffect } from "react";

type RequiredType = {
    groupId: string;
    queryString: true;
}

export default function PrismaTabs(props: Props & RequiredType) {
    const dispatch = usePrismaDispatch();
    useEffect(() => {
        const settings = props;
        dispatch({ type: 'register', settings });
        return () => { dispatch({ type: 'unregister', settings }); };
    }, []);

    return <Tabs {...props} />;
}
