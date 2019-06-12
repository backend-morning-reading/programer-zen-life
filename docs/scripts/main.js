const markdownConv = new showdown.Converter();
const formatChapter = (_chapter) => {
    const chapter = [].concat(_chapter);
    const content = markdownConv.makeHtml(chapter[0].join("\n\n"));

    delete (chapter[0]);
    let options = [];
    for (let i in chapter) {
        let item = chapter[i];
        options.push({
            text: item[0],
            next: item[1],
            action: item[2] ? item[2] : null
        })
    }
    return {
        content,
        options
    }
}
(function () {
    const vm = new Vue({
        el: '#app',
        data: function () {
            return {
                title: "程序员修仙传",
                author: "听雨",
                chapter_index: 0,
                chapter: formatChapter(chapters[0]),
                isRendered: false,
            }
        },
        mounted: function () {
            document.title = this.title;
            let doc = document.getElementById('app');
            doc.style.minHeight = window.innerHeight + "px";
            doc.style.visibility = 'visible';
            this.nextByHash(window.location.hash)
            window.onhashchange = (e) => {
                this.nextByHash(window.location.hash)
            }
            this.isRendered = true;

        },
        methods: {
            nextByHash(hash) {
                this.chapter_index = hash.replace('#', '');
                if (!this.chapter_index) {
                    this.chapter_index = 0;
                }
                if (!chapters[this.chapter_index]) {
                    alert("暂未完成，节点#" + this.chapter_index);
                    if (!this.isRendered) this.chapter_index = 0;
                } else {
                    window.scrollTo(0, 0);
                    this.chapter = formatChapter(chapters[this.chapter_index])
                }

            },
            next(n) {
                window.location.hash = '#' + n;
            }
        }
    });
})()
