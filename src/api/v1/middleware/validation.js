


export const validatePostAttributes = (requiredAttributes) => {
    return (req, res, next) => {
        const receivedAttributes = Object.keys(req.body);
        const missingAttributes = requiredAttributes.filter(attr => !receivedAttributes.includes(attr));
        if (missingAttributes.length > 0) {
            return res.status(400).end();
        }

        const extraAttributes = receivedAttributes.filter(attr => !requiredAttributes.includes(attr));
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
