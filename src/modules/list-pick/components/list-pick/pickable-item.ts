import { Type } from '@angular/core'
/**
 * Data type for `ListPickComponent` form control
 *
 * A `PickableItem` is associated with a component of type `T`.
 * This component should be immutable during its lifecycle.
 */
export interface PickableItem<T> {
    getComponent(): Type<T>
    /**
     * Called with an instance of `ComponentRef` as argument.
     * This method should inject all `@Input()` properties
     * of such component
     */
    injectData(self: T): void
    /**
     * Should return a subset of {@link data}. Precisely,
     * only parts of it judged as relevant information about the
     * item for external uses (outside of the FormControl).
     *
     * While {@link injectData} is called with param `ComponentRef` instance,
     * this method is called with the original `PickableItem`. Since this
     * would lead to inconsistencies if the component was changed while on the
     * form, the {@link ListPickComponent} form control does no such modification
     */
    retrieveData(): any
}
