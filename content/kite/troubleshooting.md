---
title: Troubleshooting
type: docs
weight: 4
---
Common problems and solutions.

<br>

### Conflicting Imports
By default, Kite auto-imports majority of Bukkit, Paper and Adventure APIs. This can ocassionaly cause type conflics, e.g. when function expects `org.bukkit.Sound` and `net.kyori.adventure.sound.Sound` was chosen by the compiler. You can fix it in a number of different ways but easiest one is to add an explicit import:
```kts
import net.kyori.adventure.sound.Sound

val sound = Sound.sound(Key.key("minecraft:entity.shulker.shoot"), Sound.Source.BLOCK, 1.0F, 1.0F)
```

Other way around is to use a fully qualified import.
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

### Code Completions
At this time, IntelliJ IDEA integration is very limited, difficult to set-up and often breaks. We plan to explore this topic in the future and can hopefully provide a step-by-step guide for setting up a proper development environment.

For the time being you can clone Kite repository and use `runServer` or `runFolia` task to quickly start a development server running **Kite**, **PlaceholderAPI** and **MiniPlaceholders**. Code completions will not work but you can easily search through dependencies in order to find function or class you're looking for.

<br>

### External Libraries
Dynamic library resolver - either via `@file:Repository` and `@file:Dependency` annotations or `libraries.json` configuration file - will be added in a future Kite release.

<br>

### Unresolved References
Certain forks introduce breaking changes to class loading and/or runtime isolation. This usually cause ***all*** scripts to fail compilation due to **unresolved reference** errors. We provide an experimental workaround for this problem but it is not guaranteed to work in all cases.

This issue is ***not*** present in **Paper** itself or in any popular fork such as **Folia**, **Purpur** or **Pufferfish**.

By adding following flag to JVM arguments, Kite will try to explicitly add server `.jar` to the compilation classpath.
```sh
-Dkite.compat.dynamic-server-jar=true
```
Location of the file is determined by looking up *some* known class and checking it's source.

In case you're still experiencing issues, don't hesitate to let us know.  
**https://github.com/EchoNineLabs/Kite/issues/new**