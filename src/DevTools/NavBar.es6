import util from '../util'

require('./NavBar.scss');

export default class NavBar extends util.Emitter
{
    constructor($el)
    {
        super();
        this._$el = $el;
        this._len = 0;

        this._bindEvent();
    }
    add(name)
    {
        this._len++;
        this._$el.append('<li>' + name + '</li>')
                 .css({
                     width: this._len * 69
                 });
    }
    activeTool(name)
    {
        var $el = this._$el;

        $el.find('li').each(function ()
        {
            var $this = util.$(this);

            $this.text() === name ? $this.addClass('eruda-active') : $this.rmClass('eruda-active');
        });
    }
    _bindEvent()
    {
        var $el = this._$el;

        var self = this;

        $el.on('click', 'li', function ()
        {
            self.emit('showTool', util.$(this).text());
        });
    }
}