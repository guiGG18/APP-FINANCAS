import { FieldError, FieldErrors } from 'react-hook-form';
import { FilteredErrorItem } from '../types/FilteredErrorItem';
interface TabItem {
    id: string;
    label: string;
    render?: () => React.ReactNode;
}

export const getFilteredErrorsArray = (
    tabs: TabItem[],
    errors: FieldErrors
): FilteredErrorItem[] => {
    const fieldNames = tabs.map(tab => tab.id);
    if (!fieldNames || !errors) return [];

    return fieldNames
        .map((name) => {
            const error = errors[name] as FieldError | undefined;

            if (error) {
                return {
                    name,
                    error
                };
            }
            return null;
        })
        .filter((item): item is FilteredErrorItem => item !== null);
};
