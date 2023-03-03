import {Dispatch, KeyboardEvent, ReactNode, SetStateAction, useCallback} from "react";

const CAPS_LOCK_HELPER_NODE = <b>Caps Lock включен</b>
export function helperTextWithCapsLock (firstStr: string | undefined, isCapsLockUsing: boolean): ReactNode | undefined {
    if (firstStr && isCapsLockUsing) return (
        <>
            {CAPS_LOCK_HELPER_NODE} ||| {firstStr}
        </>
    );
    else if (isCapsLockUsing) return CAPS_LOCK_HELPER_NODE;

    return firstStr;
}

export function onTypingCapsLock (event: KeyboardEvent<HTMLElement>, capsLockStateFunc: Dispatch<SetStateAction<boolean>>) {
    event.getModifierState("CapsLock")
    if (event.getModifierState("CapsLock")) {
        capsLockStateFunc(true);
    }
    else {
        capsLockStateFunc(false);
    }
}