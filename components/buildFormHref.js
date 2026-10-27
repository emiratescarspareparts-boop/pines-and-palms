// Plain module (no 'use client'), so it can be imported by both server
// and client components.
//
// Picks the most specific page that matches the props:
//   make + model + category + subcategory
//       -> /search-by-make/{make}/{model}/{category}/{subcategory}#myForm
//   make + model
//       -> /search-by-make/{make}/{model}#myForm
//   make + location
//       -> /search-by-brands-in-uae/{make}/{location}#myForm
//   make
//       -> /search-by-make/{make}#myForm
//   nothing
//       -> /#myForm
//
// If model and location are both passed, the model page wins.
export function buildFormHref({ make, model, category, subcategory, location } = {}) {
    const seg = (value) => encodeURIComponent(String(value).trim());

    let path;
    if (make && model && category && subcategory) {
        path = `/search-by-make/${seg(make)}/${seg(model)}/${seg(category)}/${seg(subcategory)}`;
    } else if (make && model) {
        path = `/search-by-make/${seg(make)}/${seg(model)}`;
    } else if (make && location) {
        path = `/search-by-brands-in-uae/${seg(make)}/${seg(location)}`;
    } else if (make) {
        path = `/search-by-make/${seg(make)}`;
    } else {
        path = '/';
    }

    return `${path}#myForm`;
}