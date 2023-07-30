export class RenderResultReadableStream {

    constructor(result) {

        this._result = result;
        this._iterators = [this._result[Symbol.iterator]()];

        const encoder = new TextEncoder();

        return new ReadableStream({

            pull: async (controller) => {

                let iterator = this._iterators.pop();

                while (iterator !== undefined) {

                    const next = iterator.next();

                    if (next.done === true) {

                        iterator = this._iterators.pop();

                        continue;

                    }

                    const value = next.value;

                    if (typeof value === 'string') {

                        controller.enqueue(encoder.encode(value));

                        if (this.closed) return;

                    } else {

                        this._iterators.push(iterator);

                        iterator = (await value)[Symbol.iterator]();

                    }

                }

                controller.close();

            },

            cancel: () => this.closed = true

        });

    }

}
