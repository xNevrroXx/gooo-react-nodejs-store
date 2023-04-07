import React, {FC, forwardRef, useMemo} from 'react';
import {Box, SxProps, Typography} from "@mui/material";
import classNames from "classnames";
// styles
import "./notification.scss";
// types
import {INotifier} from "../../models/INotifier";

const CROSS_SVG = (
    <svg fill="white" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 512 512">
        <polygon points="335.188,154.188 256,233.375 176.812,154.188 154.188,176.812 233.375,256 154.188,335.188 176.812,357.812 256,278.625 335.188,357.812 357.812,335.188 278.625,256 357.812,176.812"/>
        <path d="M256,0C114.609,0,0,114.609,0,256s114.609,256,256,256s256-114.609,256-256S397.391,0,256,0z M256,472 c-119.297,0-216-96.703-216-216S136.703,40,256,40s216,96.703,216,216S375.297,472,256,472z"/>
    </svg>
)
const INFORMATION_SVG = (
    <svg fill="white" width="100%" height="100%" viewBox="-1 0 19 19" xmlns="http://www.w3.org/2000/svg">
        <path fill="white" d="M16.417 9.583A7.917 7.917 0 1 1 8.5 1.666a7.917 7.917 0 0 1 7.917 7.917zM5.85 3.309a6.833 6.833 0 1 0 2.65-.534 6.787 6.787 0 0 0-2.65.534zm2.654 1.336A1.136 1.136 0 1 1 7.37 5.78a1.136 1.136 0 0 1 1.135-1.136zm.792 9.223V8.665a.792.792 0 1 0-1.583 0v5.203a.792.792 0 0 0 1.583 0z"/>
    </svg>
) 
const SUCCESS_SVG = (
    <svg width="100%" height="100%" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path fill="transparent" d="M12,21h0a9,9,0,0,1-9-9H3a9,9,0,0,1,9-9h0a9,9,0,0,1,9,9h0A9,9,0,0,1,12,21ZM8,11.5l3,3,5-5" style={{stroke: "white", strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "1.5"}}/>
    </svg>
)
const WARNING_SVG = (
    <svg width="100%" height="100%" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path fill-rule="evenodd" clip-rule="evenodd" d="M12 2.75C6.89137 2.75 2.75 6.89137 2.75 12C2.75 17.1086 6.89137 21.25 12 21.25C17.1086 21.25 21.25 17.1086 21.25 12C21.25 6.89137 17.1086 2.75 12 2.75ZM1.25 12C1.25 6.06294 6.06294 1.25 12 1.25C17.9371 1.25 22.75 6.06294 22.75 12C22.75 17.9371 17.9371 22.75 12 22.75C6.06294 22.75 1.25 17.9371 1.25 12Z" fill="white"/>
        <path fill-rule="evenodd" clip-rule="evenodd" d="M12 6.25C12.4142 6.25 12.75 6.58579 12.75 7V14.1047C12.75 14.5189 12.4142 14.8547 12 14.8547C11.5858 14.8547 11.25 14.5189 11.25 14.1047V7C11.25 6.58579 11.5858 6.25 12 6.25Z" fill="white"/>
        <path fill-rule="evenodd" clip-rule="evenodd" d="M11 17C11 16.4477 11.4477 16 12 16H12.01C12.5623 16 13.01 16.4477 13.01 17C13.01 17.5523 12.5623 18 12.01 18H12C11.4477 18 11 17.5523 11 17Z" fill="white"/>
    </svg>
)

interface INotifierProps extends INotifier{
    style?: SxProps
}
const Notification = forwardRef<HTMLDivElement, INotifierProps>(({type, title, description, style}, ref) => {
    const content: {className: string, svg: React.ReactNode} = useMemo(() => {
        switch (type) {
            case "error":
                return {
                    className: classNames({"notification": true, "notification-error": true}),
                    svg: CROSS_SVG
                };
            case "warning":
                return {
                    className: classNames({"notification": true, "notification-warning": true}),
                    svg: WARNING_SVG
                };
            case "success":
                return {
                    className: classNames({"notification": true, "notification-success": true}),
                    svg: SUCCESS_SVG
                };
            case "information":
                return {
                    className: classNames({"notification": true, "notification-information": true}),
                    svg: INFORMATION_SVG
                };
            default:
                return {
                    className: classNames({"notification": true, "notification-information": true}),
                    svg: INFORMATION_SVG
                };
        }
    }, [])

    return (
        <Box ref={ref} className={content.className} sx={{...style}}>
            <Box sx={{paddingTop: ".5rem"}}>{content.svg}</Box>
            <Box>
                <Typography variant="h6">{title}</Typography>
                <Typography variant="body1">{description}</Typography>
            </Box>
        </Box>
    )
});

export default Notification;