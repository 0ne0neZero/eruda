import util from '../lib/util'
import Draggabilly from 'draggabilly'

export default class EntryBtn extends util.Emitter
{
    constructor($parent)
    {
        super();

        util.evalCss(require('./EntryBtn.scss'));

        this._$parent = $parent;
        this._appendTpl();
        this._makeDraggable();
        this._initCfg();
        this._setPos();
        this._bindEvent();
    }
    hide() 
    {
        this._$el.hide();
    }
    show() 
    {
        this._$el.show();
    }
    _appendTpl()
    {
        let $parent = this._$parent;

        $parent.append(require('./EntryBtn.hbs')());
        this._$el = $parent.find('.eruda-entry-btn');
    }
    _setPos(orientationChanged)
    {
        let cfg = this.config,
            pos = cfg.get('pos'),
            defPos = this._getDefPos();

        let outOfRange = pos.x > defPos.x + 10 ||
                         pos.x < 0 ||
                         pos.y < 0 ||
                         pos.y > defPos.y + 10;

        if (outOfRange ||
            !cfg.get('rememberPos') ||
            orientationChanged) pos = defPos;

        this._$el.css({
            left: pos.x,
            top: pos.y
        });

        cfg.set('pos', pos);
    }
    _bindEvent()
    {
        let draggabilly = this._draggabilly,
            $el = this._$el;

        draggabilly.on('staticClick', () => this.emit('click'))
                   .on('dragStart', () => $el.addClass('eruda-active'));

        draggabilly.on('dragEnd', () =>
        {
            let cfg = this.config;

            if (cfg.get('rememberPos'))
            {
                cfg.set('pos', {
                    x: util.pxToNum(this._$el.css('left')),
                    y: util.pxToNum(this._$el.css('top'))
                });
            }

            $el.rmClass('eruda-active');
        });

        util.orientation.on('change', () => this._setPos(true));
        window.addEventListener('resize', () => this._setPos());
    }
    _makeDraggable()
    {
        this._draggabilly = new Draggabilly(this._$el.get(0), {containment: true});
    }
    _initCfg()
    {
        let cfg = this.config = util.createCfg('home-button');

        cfg.set(util.defaults(cfg.get(), {
            rememberPos: true,
            pos: this._getDefPos()
        }));
    }
    _getDefPos() 
    {
        let minWidth = this._$el.get(0).offsetWidth + 10;

        return {
            x: window.innerWidth - minWidth,
            y: window.innerHeight - minWidth
        };
    } 
}
