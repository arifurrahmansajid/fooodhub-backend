export type pageSortInput = {
    page? : number | string;
    limit? : number | string;
    sortOrder? : string;
    sortBy? : string;
}

// type pageSortOutput = {
//     page : number | string;
//     limit : number | string;
//     sortOrder : string;
//     sortBy : string;
//     skip: number  
// }

const paginationSortingHelper = (options: pageSortInput, allowedSortByOptions : string[]) => {
    const page : number = Number(options.page) || 1;
    const limit : number = Number(options.limit) || 10;
    const skip = (page - 1) * limit;

    const sortBy = options.sortBy && allowedSortByOptions.includes(options.sortBy) ? options.sortBy : "createdAt";
    const sortOrder : string = options.sortOrder || "desc";

    return {
        page,
        limit,
        skip,
        sortBy,
        sortOrder
    }
}

export default paginationSortingHelper;