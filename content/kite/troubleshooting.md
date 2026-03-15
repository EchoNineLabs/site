---
title: Troubleshooting
type: docs
weight: 6
---
Common problems and solutions.

<br>

## Conflicting Imports
By default, Kite auto-imports a majority of Bukkit, Paper and Adventure APIs. This can ocassionaly cause type conflics, e.g. when function expects `org.bukkit.Sound` and `net.kyori.adventure.sound.Sound` was chosen by the compiler. You can fix it in a number of different ways but easiest one is to add an explicit import:
```kts
import net.kyori.adventure.sound.Sound

val sound = Sound.sound(Key.key("minecraft:entity.shulker.shoot"), Sound.Source.BLOCK, 1.0F, 1.0F)
```

Another way around is to use a fully qualified import.
```kts
val sound = net.kyori.adventure.sound.Sound.Sound.sound(Key.key("minecraft:entity.shulker.shoot"), net.kyori.adventure.sound.Sound.Sound.Source.BLOCK, 1.0F, 1.0F)
```

Also don't be afraid to use Kotlin's [`as`](https://kotlinlang.org/docs/packages.html#imports) and [`typealias`](https://kotlinlang.org/docs/type-aliases.html) keywords.
```kts
import net.kyori.adventure.sound.Sound as AdventureSound

typealias SoundSource = net.kyori.adventure.sound.Sound.Source

val sound = AdventureSound.sound("minecraft:entity.shulker.shoot", SoundSource.BLOCK, 1.0F, 1.0F)
```

<br>

## Unresolved References
Certain forks introduce breaking changes to class loading and/or runtime isolation. This usually causes ***all*** scripts to fail compilation due to **unresolved reference** errors. We provide an experimental workaround for this problem but it is not guaranteed to work in all cases.

This issue is ***not*** present in **Paper** itself or in any popular fork such as **Folia**, **Purpur** or **Pufferfish**.

By adding the following flag to JVM arguments, Kite will try to explicitly add server `.jar` to the compilation classpath.
```sh
-Dkite.compat.dynamic-server-jar=true
```
Location of the file is determined by looking up *some* known class and checking it's source.

In case you're still experiencing issues, don't hesitate to let us know.  
**https://github.com/EchoNineLabs/Kite/issues/new**

<br>

## Duplicate JVM Class Name
When working with `@Import` annotation you can come across the following error:
```
[Kite] (...) Duplicate JVM class name 'X' generated from: X, X
```
Interally, every script is compiled into a `.class` file named after the script name and a `_kite` suffix.
This can cause a conflict when an imported script shares the same file name as a script already present in the dependencies, or the compiling script itself.

#### Example Structure
{{< filetree/container >}}
    {{< filetree/folder name="scripts" >}}
        {{< filetree/folder name="my_script" >}}
            {{< filetree/file name="main.kite.kts" >}}
        {{< /filetree/folder >}}
        {{< filetree/folder name="extras" >}}
            {{< filetree/file name="main.kite.kts" >}}
        {{< /filetree/folder >}}
    {{< /filetree/folder >}}
{{< /filetree/container >}}

#### Problem
{{< callout type="error" >}}
  This code is not going to compile because both `my_script/main.kite.kts` and `extras/main.kite.kts` would be compiled as `Main_kite`.
{{< /callout >}}
```kts {filename="my_script/main.kite.kts"}
@file:Import("../extras/main.kite.kts")

onLoad {
    helloWorld()
}
```
```kts {filename="extras/main.kite.kts"}
fun helloWorld() = println("Hello World")
```

#### Solution
{{< callout icon="check-circle" >}}
  Instead, you need to either use a unique file name or specify a package for scripts with conflicting names.  
  By specifying a package, compiled `.class` file will be placed in a separate directory. 
{{< /callout >}}
```kts {filename="my_script/main.kite.kts"}
@file:Import("../extras/main.kite.kts")

import extras.*

onLoad {
    helloWorld()
}
```
```kts {filename="extras/main.kite.kts"}
package extras

fun helloWorld() = println("Hello World")
```