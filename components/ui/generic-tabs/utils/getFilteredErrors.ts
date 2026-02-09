import { FieldError, FieldErrors } from 'react-hook-form';
import { FilteredErrorItem } from '../types/FilteredErrorItem';
interface TabItem {
    id: string;
    label: string;
    render?: () => React.ReactNode; // Mudou de component para render (função)
}

// Definindo o tipo do retorno para facilitar o uso depois


export const getFilteredErrorsArray = (
    tabs: TabItem[],
    errors: FieldErrors
): FilteredErrorItem[] => {
    console.log('erros na funcao util', errors)
    const fieldNames = tabs.map(tab => tab.id);
    if (!fieldNames || !errors) return [];

    return fieldNames
        .map((name) => {
            const error = errors[name] as FieldError | undefined;

            if (error) {
                return {
                    name,   // Ex: "category"
                    error   // Ex: { type: "required", message: "Selecione...", ref: ... }
                };
            }
            return null;
        })
        .filter((item): item is FilteredErrorItem => item !== null);
};
