export default class InfiniteLoopError extends Error {
    constructor(msg: string) {
        super(msg);
        Object.setPrototypeOf(this, InfiniteLoopError.prototype);
    }
}