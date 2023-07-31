export function stream(result) {

    let closed;

    const encoder = new TextEncoder();
    const iterators = [result[Symbol.iterator]()];

    return new ReadableStream({

        cancel: () => closed = true,

        pull: async (controller) => {

            let iterator = iterators.pop();

            while (iterator !== undefined) {

                const next = iterator.next();

                if (next.done === true) {

                    iterator = iterators.pop();

                    continue;

                }

                const value = next.value;

                if (typeof value === "string") {

                    controller.enqueue(encoder.encode(value));

                    if (closed) return;

                } else {

                    iterators.push(iterator);

                    iterator = (await value)[Symbol.iterator]();

                }

            }

            controller.close();

        }

    });

}
