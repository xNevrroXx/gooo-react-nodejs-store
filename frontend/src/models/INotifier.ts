export interface INotifier {
    type: "error" | "warning" | "information" | "success",
    title: string,
    description?: string,
}