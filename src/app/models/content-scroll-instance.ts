/**
 * This is the interface for all instances of the content-scroll component that we will save in our object Map
 */

export interface IContentScrollInstance {
    horizontalScrollPosition: number;
    verticalScrollPosition: number;
}

export class ContentScrollInstance implements IContentScrollInstance {
    horizontalScrollPosition: 0;
    verticalScrollPosition: 0;
}
