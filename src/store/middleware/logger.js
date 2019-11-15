export const logger = (store) => (next) => (action) => {
    console.group(action.type);
    console.log(action.meta.log || 'No description');
    console.log('Current state: ', store.getState());
    next(action);
    console.log('Next state: ', store.getState());
    console.groupEnd();
};
