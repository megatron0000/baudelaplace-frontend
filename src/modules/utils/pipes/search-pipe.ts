import { Pipe, PipeTransform } from '@angular/core'

/**
 * Adapted from {@link https://stackoverflow.com/questions/40678206/angular-2-filter-search-list}
 */
@Pipe({
    name: 'search',
    pure: false
})
export class SearchPipe implements PipeTransform {
    /**
     *
     * @param value List of `T` objects to be filtered
     * @param keys Paths in the objects by which they will be filtered.
     *
     * Examples:
     * - `'id,text'` to filter by `id` and `text`
     * - `'person.name'` to filter by nested property `name`
     * - `['id', 'name']` equivalent to the first
     *
     * @param term Text with which to filter `value`
     * @param preTransform Map to be done on `value` before property accesses are attempted
     */
    public transform<T>(
        value: T[],
        keys: string | string[],
        term: string,
        preTransform?: (elem: T) => any
    ) {
        let tempValue = preTransform ? value.map(elem => preTransform(elem)) : value
        let map = new Map<any, T>();
        (value || []).forEach((elem, index) => map.set(tempValue[index], elem))
        let filtered = !term
            ? tempValue
            : (tempValue || []).filter(item =>
                (Array.isArray(keys) ? keys : keys.split(',').map(key => key.trim()))
                    .some(key => {
                        let subkeys = key.split('.')
                        let fullPath = item
                        for (let i = 0; i < subkeys.length; i++) {
                            fullPath = fullPath[subkeys[i]] || {}
                        }
                        return fullPath && new RegExp(term, 'gi').test(fullPath)
                    })
            )
        return filtered.map(elem => map.get(elem))
    }
}
