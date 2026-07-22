interface Props {
    page: number;
    totalPages: number;
    setPage: (page: number) => void;
}

export default function Pagination({
    page,
    totalPages,
    setPage,
}: Props) {
    return (
        <div className="flex justify-end gap-3 mt-6">

            <button
                disabled={page === 1}
                onClick={() =>
                    setPage(page - 1)
                }
                className="bg-gray-300 px-4 py-2 rounded"
            >
                Prev
            </button>

            <span className="font-semibold">
                {page} / {totalPages}
            </span>

            <button
                disabled={page === totalPages}
                onClick={() =>
                    setPage(page + 1)
                }
                className="bg-blue-600 text-white px-4 py-2 rounded"
            >
                Next
            </button>

        </div>
    );
}