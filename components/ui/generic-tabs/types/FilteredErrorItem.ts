import { FieldError } from "react-hook-form";

export type FilteredErrorItem = {
    name: string;
    error: FieldError;
};