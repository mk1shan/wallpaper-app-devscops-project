# Wallpaper App: DevSecOps Pipeline Project

This project is a React-based wallpaper discovery application deployed using a full DevSecOps pipeline. The focus of this repository is on the automation, security, and monitoring of a containerized application within a Kubernetes environment.

## Project Overview

The repository contains the source code for a React/Vite application that interacts with the Pexels API. The application is built and deployed automatically through a multi-stage Jenkins pipeline.

## DevSecOps Pipeline

The CI/CD pipeline is orchestrated by Jenkins and includes the following fully automated stages:
1.  **Code Quality**: SonarQube analysis to ensure code standards and catch potential bugs.
2.  **Vulnerability Scanning**: Trivy scans both formatting and the final Docker image for security flaws.
3.  **Containerization**: Docker image build and push to Docker Hub.
4.  **Deployment**: Rolling update deployment to the Kubernetes cluster.
5.  **Notification**: Automated email alerts upon pipeline completion.

### Pipeline Visualization
![Jenkins Pipeline](images/jenkins_pipeline.png)

### Code Quality Analysis (SonarQube)
![SonarQube Analysis](images/sonarqube_analysis.png)

### Pipeline Notifications
![Email Notification](images/jenkins_email_notification.png)

## Infrastructure & Kubernetes Deployment

The application is hosted on AWS EC2 instances serving as a Kubernetes cluster (managed via Kubeadm).
- **Master Node**: Manages the control plane.
- **Worker Node**: Runs the application workloads.
- **Networking**: Calico CNI is used for pod networking.

### Cluster Status
**Running Pods:**
![Running Pods](images/pods_running.png)

### Application Deployment

**Final Application Live View:**
![Final Deployment](images/final_deploy.png)

## Monitoring & Observability

The cluster and application are continuously monitored using a Prometheus and Grafana stack.

### Prometheus Metrics
![Prometheus Dashboard](images/prometheus_dashboard.png)

### Grafana Dashboards
**Node Exporter Metrics:**
![Node Exporter](images/node_exporter_grafana.png)

**Master Node Health:**
![Grafana Master Node](images/grafana_master.png)

**Worker Node Health:**
![Grafana Worker Node](images/grafana_worker.png)

## Key Technical Features
- **Infrastructure**: AWS EC2, Kubernetes (Kubeadm)
- **CI/CD**: Jenkins, Docker Hub
- **Security**: Trivy (Container/FS Scanning), SonarQube (Static Analysis)
- **Monitoring**: Prometheus, Grafana, Node Exporter
- **Frontend**: React + Vite
