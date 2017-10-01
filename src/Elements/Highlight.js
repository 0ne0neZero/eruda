import util from '../lib/util'

export default class Highlight
{
    constructor($parent)
    {
        util.evalCss(require('./Highlight.scss'));

        this._isShow = false;

        this._appendTpl($parent);
        this._bindEvent();
    }
    setEl(el)
    {
        this._$target = util.$(el);
        this._target = el;
    }
    show()
    {
        this._isShow = true;
        this.render();
        this._$el.show();
    }
    hide()
    {
        this._isShow = false;
        this._$el.hide();
    }
    render()
    {
        let {left, width, top, height} = this._$target.offset();

        this._$el.css({left, top: top - window.scrollY, width, height});

        let computedStyle = getComputedStyle(this._target, '');

        let getNumStyle = name => util.pxToNum(computedStyle.getPropertyValue(name));

        let ml = getNumStyle('margin-left'),
            mr = getNumStyle('margin-right'),
            mt = getNumStyle('margin-top'),
            mb = getNumStyle('margin-bottom');

        this._$margin.css({
            left: -ml,
            top: -mt,
            width: width + ml + mr,
            height: height + mt + mb
        });

        let bl = getNumStyle('border-left-width'),
            br = getNumStyle('border-right-width'),
            bt = getNumStyle('border-top-width'),
            bb = getNumStyle('border-bottom-width');

        let bw = width - bl - br,
            bh = height - bt - bb;

        this._$padding.css({
            left: bl,
            top: bt,
            width: bw,
            height: bh
        });

        let pl = getNumStyle('padding-left'),
            pr = getNumStyle('padding-right'),
            pt = getNumStyle('padding-top'),
            pb = getNumStyle('padding-bottom');

        this._$content.css({
            left: bl + pl,
            top: bl + pt,
            width: bw - pl - pr,
            height: bh - pt - pb
        });

        this._$size.css({
            top: -mt - (top - mt < 25 ? 0 : 25),
            left: -ml
        }).html(`${formatElName(this._target)} | ${width} × ${height}`);
    }
    _bindEvent()
    {
        window.addEventListener('scroll', () =>
        {
            if (!this._isShow) return;
            this.render();
        }, false);
    }
    _appendTpl($parent)
    {
        $parent.append(require('./Highlight.hbs')());

        let $el = this._$el = util.$('.eruda-elements-highlight');
        this._$margin = $el.find('.eruda-margin');
        this._$padding = $el.find('.eruda-padding');
        this._$content = $el.find('.eruda-content');
        this._$size = $el.find('.eruda-size');
    }
}

function formatElName(el)
{
    let {id, className} = el;

    let ret = `<span style="color:#ee78e6">${el.tagName.toLowerCase()}</span>`;

    if (id !== '') ret += `<span style="color:#ffab66">#${id}</span>`;

    let classes = '';
    if (util.isStr(className))
    {
        util.each(className.split(/\s+/g), (val) =>
        {
            if (util.trim(val) === '') return;

            classes += `.${val}`;
        });
    }

    ret += `<span style="color:#8ed3fb">${classes}</span>`;

    return ret;
}
