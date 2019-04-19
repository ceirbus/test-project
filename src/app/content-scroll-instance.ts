/**
 * This is the interface for all instances of the content-scroll component that we will save in our object Map
 */

export interface IContentScrollInstance {
    url: string; // where this component lives, may also include params
    horizontalScrollPosition: number;
    verticalScrollPosition: number;
}

export class ContentScrollInstance implements IContentScrollInstance {
    url: string = '';
    horizontalScrollPosition: 0;
    verticalScrollPosition: 0;
}
