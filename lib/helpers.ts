export const getDiscountedPrice = (price: number, discount: number) => {
    return price - price * (discount / 100);
};

export const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
    }).format(new Date(date));
};
