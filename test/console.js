var tool = eruda.get('console'),
    $tool = $('.eruda-console');

describe('log', function ()
{
    it('string', function ()
    {
        var text = 'This is a log';

        tool.clear().log(text);
        expect($tool.find('.eruda-log')).toContainText(text);
    });

    it('basic object', function ()
    {
        var obj = {a: 1};

        tool.clear().log(obj);
        expect($tool.find('.eruda-log')).toContainText('Object {"a":1}');
    });

    it('html', function ()
    {
        tool.clear().html('<span class="color-blue">Blue</span>');
        expect($tool.find('.eruda-html')).toContainElement('span.color-blue');
    });

    it('timer', function ()
    {
        tool.clear().time('eruda');
        tool.clear().timeEnd('eruda');
        expect($tool.find('.eruda-html')).toHaveText(/eruda: \d+ms/);
    });
});

describe('substitution', function ()
{
    it('number', function ()
    {
        tool.clear().log('Eruda is %d', 1, 'year old');
        expect($tool.find('.eruda-log')).toContainText('Eruda is 1 year old');
    });

    it('string', function ()
    {
        tool.clear().log('My name is %s', 'eruda');
        expect($tool.find('.eruda-log')).toContainText('My name is eruda');
    });

    it('object', function ()
    {
        tool.clear().log('Object is %o', {a: 1});
        expect($tool.find('.eruda-log')).toContainText('Object is {"a":1}');
    });
});


describe('filter', function ()
{
    // Test case from https://github.com/liriliri/eruda/issues/14
    /*it('function', function ()
    {
        tool.clear().filter(function (log)
        {
            return !(log.type === 'error' && /deprecated(.|\n)*stringify/.test(log.src.stack));
        });

        var obj = {};
        Object.defineProperty(obj, 'a', {
            get: function ()
            {
                tool.error('deprecated');

                return 1;
            }
        });
        tool.log(obj);
        expect($tool.find('.eruda-logs li').length).toEqual(1);
    });*/
});