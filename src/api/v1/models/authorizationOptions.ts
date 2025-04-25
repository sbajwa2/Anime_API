export interface AuthorizationOptions {
    hasRole: Array<"anime" | "user" | "reviews">;
    allowSameUser?: boolean;
}