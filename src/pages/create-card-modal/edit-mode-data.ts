import { BauTag } from 'baudelaplace-bridge'

/**
 * Data that has to be supplied to a `CreateCardModal` should the user want to edit
 * an existing card instead of creating a new one. Note `tagSelector` is a function
 * which will be mapped through the list of tags available in the modal, returning true
 * for tags owned by the to-be-modified card and false otherwise
 *
 * Note this interface does not include `createdBy` field of a typical card,
 * since this information cannot be edited and, if needed for ownership
 * verification, will be acquired in the server
 *
 * @export
 * @interface EditModeData
 */
export interface EditModeData {
    mode: 'edit'
    _id: string
    question: string
    answer: string
    tagSelector: (tag: BauTag) => boolean
}
