import {useCallback, useState} from "react";
// types
import {INotifier} from "../models/INotifier";

const initialState: INotifier = {
    type: "information",
    title: "",
    description: ""
}
export const useNotifier = () => {
    const [isShowNotifier, setIsShowNotifier] = useState<boolean>(false);
    const [typeIconNotifier, setTypeIconNotifier] = useState<INotifier["type"]>(initialState.type);
    const [titleNotifier, setTitleNotifier] = useState<INotifier["title"]>(initialState.title);
    const [descriptionNotifier, setDescriptionNotifier] = useState<INotifier["description"]>(initialState.description);

    const onShowNotifier = useCallback(({type, title, description}: INotifier) => {
        setTitleNotifier(title);
        setTypeIconNotifier(type);
        setDescriptionNotifier(description);

        setIsShowNotifier(true);
    }, []);
    const onHideNotifier = useCallback(() => {
        setTypeIconNotifier(initialState.type);
        setTitleNotifier(initialState.title);
        setDescriptionNotifier(initialState.description);

        setIsShowNotifier(false);
    }, []);

    return {onShowNotifier, isShowNotifier, onHideNotifier, descriptionNotifier, titleNotifier, typeIconNotifier};
}