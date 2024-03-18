
export const validatePostAttributes = (requiredAttributes) => {
    return (req, res, next) => {
        const receivedAttributes = Object.keys(req.body);
        const missingAttributes = requiredAttributes.filter(attr => !receivedAttributes.includes(attr));
        if (missingAttributes.length > 0) {
            return res.status(400).end();
        }

        let extraAttributes = receivedAttributes.filter(attr => !requiredAttributes.includes(attr));
        const ignoreAttrubutes = ['account_updated', 'account_created']
        extraAttributes = extraAttributes.filter(attr => !ignoreAttrubutes.includes(attr));
        if (extraAttributes.length > 0) {
            return res.status(400).end();
        }
        next();
    };
};

export const validatePutAttributes = (acceptedAttributes) => {
    return (req, res, next) => {
        const receivedAttributes = Object.keys(req.body);
        const extraAttributes = receivedAttributes.filter(attr => !acceptedAttributes.includes(attr));
        if (extraAttributes.length > 0) {
            return res.status(400).end();
        }
        next();
    };
};

export const checkJsonSyntax = (err, req, res, next) => {
    if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {
        return res.status(400).end(); // Bad request
    }
    next();
};
