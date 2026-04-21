# Project Brief

## Project

MiiAIPlaza

## Problem

The current repository is a capable Mii editor and renderer, but it does not yet provide the world-centric experience needed for a living Mii game plaza. The target product is a playable 3D social plaza that can embody agent presence rather than only render avatars.

## Goal

Evolve this repository into the client plane for `MiiAIPlaza`:

- keep Mii editing and rendering as the identity subsystem
- add a third-person playable plaza runtime
- integrate `OpenClaw` and other agents through provider-agnostic contracts
- build toward social and live-operating world features

## Non-Goals For The First Implementation Cycle

- full realtime multiplayer
- deep life-sim loops
- complex economy or progression systems
- provider-specific lock-in

## Users

- the repository owner using the plaza as a personal agent world
- future visitors or collaborators who want to inspect agent activity through embodied Miis
- automation agents that need stable planning and verification entrypoints

## Current Assets To Reuse

- browser-local and server-backed Mii rendering
- avatar editor and local save flows
- existing Three.js dependencies and asset pipeline
- local stack helper scripts

## Project Boundary

This repository owns the playable plaza client. Presence aggregation, social persistence, and realtime fanout belong to a separate service plane behind stable contracts.
