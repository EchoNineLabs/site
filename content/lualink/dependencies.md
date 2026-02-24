---
title: "Dependencies"
type: docs
weight: 3
---
LuaLink provides a way to access and use plugins' APIs in your scripts. This feature is very powerful and makes it easy to integrate scripts with other plugins. It must be noted this has not been thoroughly tested yet and some issues may arise. Please be cautious when using this feature.

## Declaring Dependencies
Before we can start using any external API, we must declare a dependency. This ensures that script will not be loaded if dependency plugin is missing. To declare dependencies, you must create `init.lua` file in your script's folder.
```lua  {filename="/plugins/LuaLink/scripts/example_script/init.lua"}
return {
    dependencies = {
        "PlaceholderAPI"
    }
}
```

In this example we will use [PlaceholderAPI](https://github.com/PlaceholderAPI/PlaceholderAPI) - a plugin you should already be familiar with.

### Accessing Dependencies
Next, assuming the plugin is installed and enabled on the server, any import and call to its API should work as expected.

```lua {filename="/plugins/LuaLink/scripts/example_script/main.lua"}
local PlaceholderAPI = import("me.clip.placeholderapi.PlaceholderAPI")

-- NOTE: Placeholders in this example come from the Server expansion which is not installed by default.
script.logger:info(PlaceholderAPI:setPlaceholders(nil, "Server is running %server_variant% %server_version_full%"))
```
```log {filename="Console Output"}
[00:00:00 INFO]: [LuaLink/example_script] Server is running Paper 1.21.4-224
```

