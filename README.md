# symfony-collection.js

Symfony 3 collection jQuery handler

# Usage

## Markup

```html
<div data-prototype="{{ form_widget(form.vars.prototype)|e('html_attr') }}" 
     data-target=".entries"
     data-btn-add="#btn-add"
     data-btn-remove=".btn-remove">
  
    <div class="entries">
        {% for child in form %}
            {{ form_errors(child) }}
            {{ form_widget(child) }}
            
            <button type="button" class="btn-remove">Remove</button>
        {% endfor %}
    </div>
    
    <button type="button" id="btn-add">Add</button>
</div>
```

## Simple

```js
$('[data-prototype]').collection();
```

## Action callback

```js
$('[data-prototype]').collection({
    onadd: function(evt) {
        console.log(evt);
    },
    onremove: function(evt) {
        console.log(evt);
    }
});
```

# About CollectionType

http://symfony.com/doc/current/reference/forms/types/collection.html

http://symfony.com/doc/current/cookbook/form/form_collections.html#cookbook-form-collections-new-prototype
