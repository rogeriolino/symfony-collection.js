(function($) {
    'use strict'
    
    var collIndexName = 'collection-index',
        entryClassName = 'symfony-collection-entry';
    
    /*
     * global function
     */
    
    window.SymfonyCollection = function (elem, props) {
        var prototype = (props.prototype || ''),
            targetSelector = (props.target || ''),
            btnAddSelector = (props.btnAdd || ''),
            btnRemoveSelector = (props.btnRemove || ''),
            onAddCallback = (props.onadd || props.onAdd || null),
            onRemoveCallback = (props.onremove || props.onRemove || props.ondelete || props.onDelete || null),
            target = null;
        
        if (targetSelector.length) {
            target = $(targetSelector);
        }
        
        if (!target) {
            target = elem;
        }
        
        elem.data(collIndexName, target.children().length);
        
        $.each(target.children(), function() {
            $(this).addClass(entryClassName);
        });

        if (btnAddSelector.length) {
            var btn = $(btnAddSelector);
            btn.on('click', function() {
                var index = elem.data(collIndexName),
                    entry = $(prototype.replace(/__name__/g, index));

                if (btnRemoveSelector) {
                    // remove new entry
                    entry.find(btnRemoveSelector).on('click', function () {
                        entry.remove();
                        if (typeof onRemoveCallback === 'function') {
                            onRemoveCallback({
                                handler: elem,
                                target: target,
                                entry: entry
                            });
                        }
                    });
                }
                
                entry.addClass(entryClassName);
                
                target.append(entry);
                
                elem.data(collIndexName, index + 1);
                
                if (typeof onAddCallback === 'function') {
                    onAddCallback({
                        handler: elem,
                        target: target,
                        entry: entry
                    });
                }
            });
        }
        
        if (btnRemoveSelector) {
            // remove old entries
            target.find(btnRemoveSelector).on('click', function () {
                var entry = $(this).parents('.' + entryClassName);
                entry.remove();
                
                if (typeof onRemoveCallback === 'function') {
                    onRemoveCallback({
                        handler: elem,
                        target: target,
                        entry: entry
                    });
                }
            });
        }
    };
    
    /*
     * jQuery plugin
     */
    
    $.fn.collection = function (props) {
        props = props || {};
        
        $(this).each(function() {
            var elem = $(this);
            
            if (!props.target) {
                props.target = elem.data('target');
            }
            
            if (!props.btnAdd) {
                props.btnAdd = $(elem.data('btn-add'));
            }
            
            if (!props.btnRemove) {
                props.btnRemove = elem.data('btn-remove');
            }
            
            if (!props.prototype) {
                props.prototype = elem.data('prototype');
            }
            
            SymfonyCollection(elem, props);
        });
        
        return this;
    };
    
})(jQuery);