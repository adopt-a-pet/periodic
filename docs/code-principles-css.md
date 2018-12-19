
### Don't use `<style scoped>`

As you may know, you can put your styles inside of your .vue files like so:

```html
<style scoped>
.example {
  ...
}
</style>
```

That then gets processed into something like:

```html
.example[data-v-f3f3eg9] {
  ...
}
```

And then the Vue component automatically attaches a `data-v-f3f3eg9` property to the DOM node that corresponds to the class name. It's a nice idea but we don't need it because we already namespace all classes created with `+b(...)` under `periodic-`. What's worse is that the Webpack configurations forked from `vue-design-system` have a bug where if even _one_ of the Vue components uses `<style scoped>`, the final output CSS file `dist/system/system.css` doubles in size. _Doubles!_ It looks like Webpack first processes `.sass|.scss` files properly, but then sends the whole output of that CSS into vue-loader. vue-loader Then takes those classes and duplicates each one, adding a `[data-v-...]` to the class name! It does this for _every_ class, rather than just the ones that came from a .vue file that had `<style scoped>` in it. The way to avoid this right now is just to always use a separate sass file.