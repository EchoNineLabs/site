---
title: "Getting Started"
type: docs
weight: 1
---

**Kite** is plugin that provides a Kotlin scripting runtime for Paper-based Minecraft servers. It is designed for small and simple tasks and serves as a much more powerful alternative to Skript and other scripting plugins.

{{< cards cols="3" >}}
  {{< card link="https://modrinth.com/plugin/kite" title="Modrinth" icon="modrinth" >}}
  {{< card link="https://hangar.papermc.io/EchoNine/Kite" title="Hangar" icon="hangar" >}}
  {{< card link="https://github.com/EchoNineLabs/Kite" title="GitHub" icon="github" >}}
{{< /cards >}}

<br>

<div class="features">

|                             |                                                                                                                      |
| :-------------------------: | :------------------------------------------------------------------------------------------------------------------- |
| {{< icon "fast-forward" >}} | <u>**High Performance**</u><br>Scripts are compiled to achieve near-native performance.                              |
| {{< icon "leaf" >}}         | <u>**Folia Support**</u><br>Scripting runtime is compatible with Folia. This includes wrappers for Folia schedulers. |
| {{< icon "terminal" >}}     | <u>**Command Registration**</u><br>Register commands effortlessly with a single function.                            |
| {{< icon "puzzle" >}}       | <u>**Event Listening**</u><br>Listen to Bukkit, Spigot, Paper, or even custom plugin events.                         |
| {{< icon "globe-alt" >}}    | <u>**Access Everything**</u><br>Full access to Bukkit API, built-in libraries and loaded plugins.                    |
| {{< icon "collection" >}}   | <u>**Script Organization**</u><br>Split scripts into multiple files or keep it simple with one file per script.      |

</div>

<br>

## Installation
Follow these installation steps to get started with Kite.

{{% steps %}}

### Requirements
- **[Paper](https://papermc.io/)** based server running **1.21.1** or higher, and Java **21**.
- Understanding of **Kotlin** language and general JVM concepts is beneficial.

### Download
- [**Modrinth** (modrinth.com/plugin/kite)](https://modrinth.com/plugin/kite)
- [**Hangar** (hangar.papermc.io/EchoNine/Kite)](https://hangar.papermc.io/EchoNine/Kite)
- [**GitHub** (github.com/EchoNineLabs/Kite)](https://github.com/EchoNineLabs/Kite)

### Install
Put downloaded plugin in your `plugins` directory and restart the server.

### Create
Kite should now be up and running. Learn more about writing scripts in sections below.

{{% /steps %}}

<br>

## Quick Start
This small guide should put you on track.

{{% steps %}}

### Useful Links
- [**Kotlin Documentation** (kotlinlang.org)](https://kotlinlang.org/docs/basic-syntax.html)  
  Useful info for getting started with Kotlin and Kite development.
- [**Paper Documentation** (docs.papermc.io)](https://docs.papermc.io/paper/dev/)  
  Useful info for getting started with Paper ecosystem.
- [**Paper JavaDocs** (jd.papermc.io)](https://jd.papermc.io/paper/)  
  Paper / Bukkit API reference.
- [**Adventure JavaDocs** (javadoc.io)](https://javadoc.io/doc/net.kyori/adventure-api)    
  Adventure API reference.
- [**Kite Discord** (discord.com)](https://discord.gg/xYcjBKqkDz)  
  We are always happy to answer your questions.

### Structure
- Scripts must end with `.kite.kts` extension.
- Scripts can be stored directly inside `plugins/Kite/scripts` directory.  
  <sup>Example: `plugins/Kite/scripts/my_script.kite.kts`</sup>
- Scripts can be stored inside sub-folders of `plugins/Kite/scripts` directory.  
  <sup>Example: `plugins/Kite/scripts/my_other_script/main.kite.kts`</sup>
  - Entry point of the script must be a file named `main.kite.kts`.
  - Other files within the same sub-folder can be imported using top-level `@file:Import` annotation.  
    <sup>Example: `@file:Import("helpers.kite.kts")`
- Single-file and multi-file script projects can be used at the same time.

{{< filetree/container >}}
    {{< filetree/folder name="Kite" >}}
    {{< filetree/folder name="scripts" >}}
        {{< filetree/file name="my_script.kite.kts" >}}
        <sup>This is a single-file script.</sup>
        {{< filetree/file name="small_script.kite.kts" >}}
        <sup>This is also a single-file script.</sup>
        {{< filetree/folder name="my_other_script" >}}
            {{< filetree/file name="main.kite.kts" >}}
            <sup>This is the entry point of **sub_example** script.</sup>
            {{< filetree/file name="helpers.kite.kts" >}}
            <sup>This is an additional script that can be imported with `@file:Import("helpers.kite.kts")` annotation.</sup>
        {{< /filetree/folder >}}
    {{< /filetree/folder >}}
    {{< /filetree/folder >}}
{{< /filetree/container >}}

### Lifecycle
Scripts, similarly to plugins, have `onLoad` and `onUnload` blocks that are called respectively after loading, and before unloading a script. **You should really make use of them.**
```kts
onLoad {
    println("Hello, World!")
}
```
```kts
onUnload {
    println("Godbye, World!")
}
```

### Compilation
Kite compiles scripts to [Java Bytecode](https://en.wikipedia.org/wiki/Java_bytecode) and stores the result inside `plugins/Kite/cache` directory. It is very important to understand where to put your code in order to avoid potential resource leaks.

Top-level function calls, property and object intialization will be done right after compilation.
```kts
println("Hello from compilation!")
```

Since compilation is asynchronous, you should avoid calling non-thread-safe functions outside of `onLoad` and `onDisable` blocks.

**Example**
{{< callout type="error" >}}
  Function **Player#getTargetBlockExact** cannot be called outside of the main thread.  
  This will result in an exception being thrown.
{{< /callout >}}
```kts
val targetBlock = server.getPlayer("Player").getTargetBlockExact(10)

onLoad {
    println(targetBlock.type)
}
```

{{< callout icon="check-circle" >}}
  Instead, you should take a safe approach.
{{< /callout >}}
```kts
onLoad {
    val targetBlock = server.getPlayer("Player").getTargetBlockExact(10)
    println(targetBlock.type)
}
```

### Importing
Majority of **Bukkit** and **Paper** imports can be omitted, as they are added automatically during compilation. This includes but is not limited to:
- `org.bukkit`
- `io.papermc.paper`
- `com.destroytokyo.paper`
- `net.kyori.adventure.text`

Anything else, such as external plugin APIs, must be imported before you can reference it in coded.
```kts
import me.clip.placeholderapi.PlaceholderAPI

onLoad {
    println(PlaceholderAPI.setPlaceholders(null, "%server_uptime%"))
}
```

In case you run into a type conflict problems, see:

{{< cards cols="3" >}}
  {{< card link="/docs/kite/troubleshooting#conflicting-imports" title="Troubleshooting" subtitle="Conflicting Imports" >}}
{{< /cards >}}

<br>

### Reference & Examples
Learn more about provided APIs and examples on the [**Reference**](/kite/reference) page.

{{< cards cols="3" >}}
  {{< card link="/docs/kite/reference" title="Reference" subtitle="Kite built-in APIs reference." >}}
{{< /cards >}}

{{% /steps %}}

<br>
