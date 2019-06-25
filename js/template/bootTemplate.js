window.BootTemplate = {
    mvItem: ({ title, url }) => {
        return `
<a href="${url}" class='mv-item'>
    <div class='mv-title'>
        <div class="favicon" title='${title}' style="background-image:url(https://s2.googleusercontent.com/s2/favicons?domain_url=${url}/&alt=s&sz=32)"></div>
        <span>${title}</span>
</div>
</a>
`;
    }
};