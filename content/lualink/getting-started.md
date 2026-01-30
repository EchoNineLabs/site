---
title: "Getting Started"
type: docs
weight: 1
---

**LuaLink** is plugin that provides a Lua scripting runtime for Paper-based Minecraft servers. It is designed for small and simple tasks and serves as a much more powerful alternative to Skript and other scripting plugins.

{{< cards cols="3" >}}
  {{< card link="https://modrinth.com/plugin/lualink" title="Modrinth" icon="modrinth" >}}
  {{< card link="https://hangar.papermc.io/LuaLink/LuaLink" title="Hangar" icon="hangar" >}}
  {{< card link="https://github.com/LuaLink/LuaLink" title="GitHub" icon="github" >}}
{{< /cards >}}

<br>

<div class="features">

|                             |                                                                                                                                                   |
| :-------------------------: | :------------------------------------------------------------------------------------------------------------------------------------------------ |
| {{< icon "fast-forward" >}} | <u>**High Performance**</u><br>LuaLink leverages LuaJava and LuaJIT, which are implemented primarily in C, ensuring fast and efficient execution. |
| {{< icon "thumb-up" >}}     | <u>**User-Friendly API**</u><br>Simplifies scripting with an intuitive and easy-to-use API.                                                       |
| {{< icon "terminal" >}}     | <u>**Command Registration**</u><br>Register commands effortlessly with a single function.                                                         |
| {{< icon "puzzle" >}}       | <u>**Event Listening**</u><br>Listen to Bukkit, Spigot, Paper, or even custom plugin events.                                                      |
| {{< icon "globe-alt" >}}    | <u>**Access Everything**</u><br>Full access to Bukkit API, built-in libraries and loaded plugins.                                                 |
| {{< icon "globe-alt" >}}    | <u>**Java Library Integration**</u><br>Extend LuaLink’s capabilities by using any Java library.                                                   |
| {{< icon "collection" >}}   | <u>**Script Organization**</u><br>Split scripts into multiple files or keep it simple with one file per script.                                   |

</div>

Scripting runtime is based on **[LuaJava](https://github.com/gudzpoz/luajava)** with **[LuaJIT](https://github.com/LuaJIT/LuaJIT)**. For more details on implementation specifics or differences, please refer to their respective documentation.  

<br>

## Installation
Follow these installation steps to get started with LuaLink.

{{% steps %}}

### Requirements
- **[Paper](https://papermc.io/)** based server running **1.21.1** or higher, and Java **21**.
- System or container environment with **[glibc 2.34](https://en.wikipedia.org/wiki/Glibc)** or higher.  
  <sup>For example **Debian 12**, **Ubuntu 22.04**, **CentOS 9** and newer.</sup>
- Understanding of **Lua** language and general JVM concepts is beneficial.

### Download
- [**Modrinth** (modrinth.com/plugin/lualink)](https://modrinth.com/plugin/lualink)
- [**Hangar** (hangar.papermc.io/LuaLink/LuaLink)](https://hangar.papermc.io/LuaLink/LuaLink)
- [**GitHub** (github.com/LuaLink/LuaLink)](https://github.com/LuaLink/LuaLink)

### Install
Put downloaded plugin in your `plugins` directory and restart the server.

### Create
LuaLink should now be up and running. Learn more about writing scripts in sections below.

{{% /steps %}}

<br>

## Quick Start
This small guide should put you on track.

{{% steps %}}

### Useful Links
- [**Lua** (devdocs.io)](https://devdocs.io/lua/)  
  Useful info for getting started with Lua and LuaLink development.
- [**Paper Documentation** (docs.papermc.io)](https://docs.papermc.io/paper/dev/)  
  Useful info for getting started with Paper ecosystem.
- [**Paper JavaDocs** (jd.papermc.io)](https://jd.papermc.io/paper/)  
  Paper / Bukkit API reference.
- [**Adventure JavaDocs** (javadoc.io)](https://javadoc.io/doc/net.kyori/adventure-api)    
  Adventure API reference.
- [**LuaLink Discord** (discord.com)](https://discord.gg/xYcjBKqkDz)  
  We are always happy to answer your questions.

### Structure
- Scripts must end with `.lua` extension.
- Scripts can be stored directly inside `plugins/LuaLink/scripts` directory.  
  <sup>Example: `plugins/LuaLink/scripts/my_script.lua`</sup>
- Scripts can be stored inside sub-folders of `plugins/LuaLink/scripts` directory.  
  <sup>Example: `plugins/LuaLink/scripts/my_other_script/main.lua`</sup>
  - Entry point of the script must be a file named `main.lua`.
  - Other files within the same sub-folder can be imported using `require` keyword.  
    <sup>Example: `require("helpers")`
- Single-file and multi-file script projects can be used at the same time.

{{< filetree/container >}}
    {{< filetree/folder name="LuaLink" >}}
    {{< filetree/folder name="scripts" >}}
        {{< filetree/file name="my_script.lua" >}}
        <sup>This is a single-file script.</sup>
        {{< filetree/file name="small_script.lua" >}}
        <sup>This is also a single-file script.</sup>
        {{< filetree/folder name="my_other_script" >}}
            {{< filetree/file name="main.lua" >}}
            <sup>This is the entry point of **sub_example** script.</sup>
            {{< filetree/file name="helpers.lua" >}}
            <sup>This is an additional script that can be imported with `require("helpers")` keyword.</sup>
        {{< /filetree/folder >}}
    {{< /filetree/folder >}}
    {{< /filetree/folder >}}
{{< /filetree/container >}}

### Lifecycle
Scripts, similarly to plugins, have `onLoad` and `onUnload` blocks that are called respectively after loading, and before unloading a script. **You should really make use of them.**
```lua
-- Called after the script has been successfully loaded.
script:onLoad(function()
    script.logger:info("Script has been loaded.")
end)

```
```lua
-- Called before the script is attempted to be unloaded.
script:onUnload(function()
    script.logger:info("Script is about to be unloaded.")
end)
```

### Importing
Each referenced Java class must be imported using the `import` keyword.
```lua
local Bukkit = import("org.bukkit.Bukkit")
local MiniMessage = import("net.kyori.adventure.text.minimessage.MiniMessage")

script:onLoad(function(event)
    -- Creating Component using MiniMessage serializer. https://docs.advntr.dev/minimessage/index.html
    local component = MiniMessage:miniMessage():deserialize("<rainbow>Did you know you can make rainbow text?!")
    -- Sending component to everyone, including console.
    Bukkit:getServer():sendMessage(component)
end)
```

Each referenced Lua class or library, must be required using the `require` keyword.
```lua
local Counter = require("example_library")

script:onLoad(function()
    -- Creating a new instance of the Counter class.
    local counter = Counter.new()
    -- Incrementing the counter three times.
    counter:increment()
    counter:increment()
    counter:increment()
    -- Printing current value of the counter to the console.
    script.logger:info(counter:get() .. " is the current value of the counter.")
end)
```

### Constructors and Instances
New instances of Java classes can be created as follows.

```lua
local Bukkit = import("org.bukkit.Bukkit")
local Keyed = import("net.kyori.adventure.key.Keyed")
local NamespacedKey = import("org.bukkit.NamespacedKey")

script:onLoad(function()
    -- Creating new instance of NamespacedKey class.
    local key = NamespacedKey("minecraft", "overworld")
    -- Getting instance of the primary world.
    local world = Bukkit:getWorld(key)
    -- Checking if World is instance of Keyed. (SPOILER: IT IS)
    if (Keyed.class:isInstance(world) == true) then 
        -- Sending loaded chunks count to the console.
        script.logger:info("World " .. world:key():asString() .. " has " .. world:getChunkCount() .. " chunks loaded.")
    end
end)
```

### Commands

Non-complex commands can be created with little effort using built-in API.
```lua
local Bukkit = import("org.bukkit.Bukkit")

-- Function to handle command tab-completion.
function onTabComplete(sender, args)
    -- No suggestions will be shown for this command.
    return {}
end

script:registerCommand(function(sender, args)
    -- Joining arguments to string using space as delimiter.
    -- java.luaify(...) function is responsible for converting Java objects to Lua. In this case, it converts String[] to a Lua table.  
    local message = table.concat(java.luaify(args), " ")
    -- Sending message back to the sender.
    sender:sendRichMessage(message)
end, {
    -- REQUIRED
    name = "echo",
    -- OPTIONAL
    aliases = {"e", "print"},
    permission = "scripts.command.echo",
    description = "Prints specified message to the sender.",
    usage = "/echo [message]",
    tabComplete = onTabComplete
})
```

### Events
Bukkit events can be hooked into relatively easily.

```lua
-- Called when player joins the server.
script:registerListener("org.bukkit.event.player.PlayerJoinEvent", function(event)
    -- Getting player associated with the event. 
    local player = event:getPlayer()
    -- Playing firework sound to the player.
    player:playSound(player:getLocation(), "entity.firework_rocket.launch", 1.0, 1.0)
    -- Sending welcome message to the player.
    player:sendRichMessage("<green>Welcome back to the server, " .. player:getName() .. "!")
end)
```

### Scheduler
Scheduler can be used to register single-use, delayed or repeating tasks.

```lua
-- Schedules a task to be run on the next tick.
scheduler:run(function(runnable)
    -- Whatever belongs to the task goes here.
end)

-- Schedules a task to be run after 20 ticks has passed. 
scheduler:runDelayed(function(runnable)
    -- Whatever belongs to the task goes here.
end, 20)

-- Schedules a task to be run after 20 ticks has passed, and repeated every 160 ticks.
scheduler:runRepeating(function(runnable)
    -- Whatever belongs to the task goes here.
end, 20, 160)
```
Tasks can also be run asynchronously, but please note that neither the Bukkit API nor the LuaLink API is guaranteed to be thread-safe.

```lua
-- Schedules asynchronous task to be run on the next tick.
scheduler:runAsync(handler: (BukkitRunnable) -> void): BukkitTask
-- Schedules asynchronous task to be run after {delay} ticks has passed.
scheduler:runDelayedAsync(handler: (BukkitRunnable) -> void, delay: number): BukkitTask
-- Schedules task to be run after {delay} ticks has passed, and repeated every {period} ticks.
scheduler:runRepeatingAsync(handler: (BukkitRunnable) -> void, delay: number, period: number): BukkitTask
```

<br>

### Reference & Examples
Learn more about provided APIs and examples on the [**Reference**](/lualink/reference) page.

{{< cards cols="3" >}}
  {{< card link="/docs/lualink/reference" title="Reference" subtitle="LuaLink built-in APIs reference." >}}
{{< /cards >}}

{{% /steps %}}

<br>
