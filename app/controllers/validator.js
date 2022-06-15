let merchantRules = {
    username: 'required|min:3|max:50',
    password: 'required|min:6',
    address: 'required',
    join_date: 'required|date',
    phone_number: 'required|numeric',
}

let productRules = {
    name: 'required|min:3|max:50',
    quantity: 'required|min:1|numeric',
    price: 'required|min:10000|numeric',
}

exports.merchantRules = merchantRules
exports.productRules = productRules