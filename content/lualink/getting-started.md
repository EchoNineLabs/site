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
...

<br>

### Reference & Examples
Learn more about provided APIs and examples on the [**Reference**](/lualink/reference) page.

{{< cards cols="3" >}}
  {{< card link="/docs/lualink/reference" title="Reference" subtitle="LuaLink built-in APIs reference." >}}
{{< /cards >}}

{{% /steps %}}

<br>
