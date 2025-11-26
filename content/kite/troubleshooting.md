---
title: Troubleshooting
type: docs
weight: 3
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