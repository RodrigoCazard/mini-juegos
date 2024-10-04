'use client'

import { useEffect, useMemo, useState } from "react"
import Particles, { initParticlesEngine } from "@tsparticles/react"
import { type Container } from "@tsparticles/engine"
import { loadSlim } from "@tsparticles/slim"

export default function Component() {
      const [init, setInit] = useState(false)

      useEffect(() => {
            initParticlesEngine(async (engine) => {
                  await loadSlim(engine)
            }).then(() => {
                  setInit(true)
            })
      }, [])

      const particlesLoaded = async (container?: Container): Promise<void> => {
            console.log("Particles container loaded", container)
      }

      const options: any = useMemo(
            () => ({
                  particles: {
                        number: {
                              value: 80,
                              density: {
                                    enable: true,
                                    value_area: 800
                              }
                        },
                        color: {
                              value: "#ffffff"
                        },
                        shape: {
                              type: "circle",
                              stroke: {
                                    width: 0,
                                    color: "#000000"
                              },
                        },
                        opacity: {
                              value: 0.5,
                              random: false,
                              anim: {
                                    enable: false,
                                    speed: 1,
                                    opacity_min: 0.1,
                                    sync: false
                              }
                        },
                        size: {
                              value: 3,
                              random: true,
                              anim: {
                                    enable: false,
                                    speed: 40,
                                    size_min: 0.1,
                                    sync: false
                              }
                        },
                        line_linked: {
                              enable: true,
                              distance: 150,
                              color: "#ffffff",
                              opacity: 0.4,
                              width: 1
                        },
                        move: {
                              enable: true,
                              speed: 2, // Reduced speed for smoother movement
                              direction: "none",
                              random: false,
                              straight: false,
                              out_mode: "out",
                              bounce: false,
                              attract: {
                                    enable: false,
                                    rotateX: 600,
                                    rotateY: 1200
                              }
                        }
                  },
                  interactivity: {
                        detectsOn: "window", // Changed from "canvas" to "window" for better detection
                        events: {
                              onHover: {
                                    enable: true,
                                    mode: "grab" // Changed from "repulse" to "grab" for smoother interaction
                              },
                              onClick: {
                                    enable: true,
                                    mode: "push"
                              },
                              resize: true
                        },
                        modes: {
                              grab: {
                                    distance: 140, // Reduced distance for subtler effect
                                    links: {
                                          opacity: 0.5 // Reduced opacity for subtler effect
                                    }
                              },
                              push: {
                                    quantity: 4
                              },
                        }
                  },
                  retina_detect: true,
                  fps_limit: 30, // Added FPS limit for smoother performance
                  background: {
                        color: "#000000", // Added background color,
                        opacity: 0 // Added background opacity
                  },
                  fullScreen: {
                        enable: true,
                        zIndex: -1
                  }
            }),
            []
      )

      if (!init) {
            return null
      }

      return (
            <Particles
                  id="tsparticles"
                  particlesLoaded={particlesLoaded}
                  options={options}
                  className="absolute inset-0 -z-10"
            />
      )
}