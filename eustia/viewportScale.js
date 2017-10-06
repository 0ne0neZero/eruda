/* Get viewport scale.
 * 
 * ```javascript
 * viewportScale(); // -> 3
 * ```
 */

_('meta clamp trim each map');

function exports() 
{
    let viewport = meta('viewport');

    if (!viewport) return 1;

    viewport = map(viewport.split(','), val => trim(val));

    let minScale = 0.25,
        maxScale = 5,
        initialScale = 1;

    each(viewport, val => 
    {
        val = val.split('=');

        let key = val[0];
        val = val[1];

        if (key === 'initial-scale') initialScale = +val;
        if (key === 'maximum-scale') maxScale = +val;
        if (key === 'minimum-scale') minScale = +val;
    });

    return clamp(initialScale, minScale, maxScale);
}